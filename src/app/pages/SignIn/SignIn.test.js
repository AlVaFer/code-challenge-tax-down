import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import SignIn from "./SignIn";
import { Provider } from "react-redux";
import { INITIAL_SUBMISSIONS } from "../../utils/constants";
import { store } from "../../store/store";
import reducer, { signin, taxesBase } from "../../store/taxesSlice";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

const taxes = [
  {
    id: "1",
    name: "Tax Season 2021",
    year: "2021",
  },
  {
    id: "2",
    name: "Tax Season 2020",
    year: "2020",
  },
];

const reduxState = {
  taxes,
  user: {},
  submissions: INITIAL_SUBMISSIONS,
};

const userCredentials = { email: "taxdown", password: "taxdown" };

const reduxStateLogged = {
  taxes: [],
  user: userCredentials,
  submissions: INITIAL_SUBMISSIONS,
};

const labels = [
  /Email. Type taxdown to access/i,
  /Password. Type taxdown to access/i,
];

describe("<SignIn/>", () => {
  const setup = () => {
    render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );
  };

  test("Exist labels", async () => {
    setup();
    for await (const label of labels) {
      const emailLabel = await screen.findAllByLabelText(label);
      expect(emailLabel[0]).toBeInTheDocument();
    }
  });

  test("Add Taxes", async () => {
    setup();
    expect(reducer(undefined, taxesBase(taxes))).toEqual(reduxState);
  });

  test("Type and access", async () => {
    setup();
    const user = userEvent.setup();
    const emailTextBox = screen.getByRole("textbox", {
      name: /email/i,
    });
    const PasswordTextBox = screen.getByRole("textbox", {
      name: /email/i,
    });
    await user.clear(emailTextBox);
    await user.type(emailTextBox, "taxdown");
    await user.clear(PasswordTextBox);
    await user.type(PasswordTextBox, "taxdown");
    expect(reducer(undefined, signin(userCredentials))).toEqual(reduxStateLogged);
  });
});
