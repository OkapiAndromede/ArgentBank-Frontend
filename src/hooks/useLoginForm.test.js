import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../features/auth/authThunks";
import { rememberUser } from "../features/auth/authSlice";
import { act, renderHook } from "@testing-library/react";
import useLoginForm from "./useLoginForm";
import { getUserData } from "../features/user/userThunks";

// Mocks des dépendances
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../features/auth/authThunks", () => ({
  logIn: jest.fn(() => async (dispatch) => {
    return { type: "logIn/fulfilled" };
  }),
}));

jest.mock("../features/user/userThunks", () => ({
  getUserData: jest.fn(() => async () => ({
    payload: {
      body: { firstName: "Tony", lastName: "Stark", userName: "Iron" },
    },
  })),
}));

jest.mock("../features/auth/authSlice", () => ({
  rememberUser: jest.fn(),
}));

logIn.fulfilled = { match: jest.fn() };

describe("When a user tries to connect to his account and the credentials are valid", () => {
  let dispatchMock, navigateMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    navigateMock = jest.fn();

    useDispatch.mockReturnValue(dispatchMock);
    useNavigate.mockReturnValue(navigateMock);
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("logs in successfully without rememberMe", async () => {
    //Préparation du scénario
    const mockResult = { type: "logIn/fulfilled" };
    logIn.fulfilled.match.mockReturnValue(true);
    dispatchMock.mockResolvedValueOnce(mockResult);

    dispatchMock.mockResolvedValueOnce({
      payload: { body: { firstName: "Tony" } },
    });

    //Obtention de l'objet result représentant handleLoginSubmit
    const { result } = renderHook(() => useLoginForm());

    //Simulation de la connexion utilisateur
    await act(async () => {
      await result.current.handleLoginSubmit({
        email: "tony@gmail.com",
        password: "123",
        rememberMe: false,
      });
    });

    expect(dispatchMock).toHaveBeenCalledWith(expect.any(Function));
    expect(dispatchMock).toHaveBeenCalledWith(expect.any(Function));
    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(navigateMock).toHaveBeenCalledWith("/user-account");
  });
  it("logs in successfully with rememberMe", async () => {
    const mockResult = {
      type: "logIn/fulfilled",
      payload: { body: { token: "abc123" } },
    };
    logIn.fulfilled.match.mockReturnValue(true);

    dispatchMock
      .mockResolvedValueOnce(mockResult) // logIn
      .mockResolvedValueOnce({}) // rememberUser
      .mockResolvedValueOnce({
        // getUserData
        payload: {
          body: { firstName: "Tony", lastName: "Stark", userName: "Iron" },
        },
      });

    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      await result.current.handleLoginSubmit({
        email: "tony@gmail.com",
        password: "123",
        rememberMe: true,
      });
    });

    expect(localStorage.getItem("token")).toBe("abc123");
    expect(localStorage.getItem("firstName")).toBe("Tony");
    expect(localStorage.getItem("lastName")).toBe("Stark");
    expect(localStorage.getItem("userName")).toBe("Iron");
    expect(localStorage.getItem("isRemember")).toBe("true");
    expect(navigateMock).toHaveBeenCalledWith("/user-account");
  });
});
