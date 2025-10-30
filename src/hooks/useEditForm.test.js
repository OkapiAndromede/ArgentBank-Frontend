import { useDispatch, useSelector } from "react-redux";
import { putUserData } from "../features/user/userThunks";
import { toast } from "react-toastify";
import { act, renderHook } from "@testing-library/react";
import useEditForm from "./useEditForm";

// Mocks des dépendances
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn() },
}));

jest.mock("../features/user/userThunks", () => ({
  putUserData: jest.fn(() => async (dispatch) => {
    return { type: "putUserData/fulfilled" };
  }),
}));

putUserData.fulfilled = { match: jest.fn() };

//Description du test
describe("When a user try to edit a new userName", () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();

    useDispatch.mockReturnValue(dispatchMock);
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("edit a new userName successfully without isRemember", async () => {
    //Préparation du scénario
    const mockResult = { type: "putUserData/fulfilled" };
    putUserData.fulfilled.match.mockReturnValue(true);
    dispatchMock.mockResolvedValueOnce(mockResult);
    useSelector.mockReturnValue(false); // isRemember = false

    const { result } = renderHook(() => useEditForm());

    //Simulation de l'édition d'un nouveau nom d'utilisateur
    await act(async () => {
      await result.current.handleEditSubmit({ userName: "Toto" });
    });

    expect(putUserData).toHaveBeenCalledWith({ userName: "Toto" });
    expect(dispatchMock).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Username updated successfully");
    expect(localStorage.getItem("userName")).toBeNull();
  });

  it("edit a new userName successfully with isRemember", async () => {
    //Préparation du scénario
    const mockResult = { type: "putUserData/fulfilled" };
    putUserData.fulfilled.match.mockReturnValue(true);
    dispatchMock.mockResolvedValueOnce(mockResult);
    useSelector.mockReturnValue(true); // isRemember = true

    const { result } = renderHook(() => useEditForm());

    //Simulation de l'édition d'un nouveau nom d'utilisateur
    await act(async () => {
      await result.current.handleEditSubmit({ userName: "Toto" });
    });

    expect(putUserData).toHaveBeenCalledWith({ userName: "Toto" });
    expect(dispatchMock).toHaveBeenCalled();
    expect(localStorage.getItem("userName")).toBe("Toto");
    expect(toast.success).toHaveBeenCalledWith("Username updated successfully");
  });
});
