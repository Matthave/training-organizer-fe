import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import ExerciseItem from "./ExerciseItem";
import { IExercise } from "@/types/exercises";

const mockExercise: IExercise = {
  _id: "1",
  name: "Test Exercise",
  description: "Test Description",
  classification: 3,
  part: [{ _id: "p1", name: "Part 1" }],
  subpart: [
    {
      _id: "s1",
      name: "Subpart 1",
      part: "Part 1",
    },
  ],
};

describe("ExerciseItem", () => {
  it("renders the exercise item correctly", () => {
    const onExerciseDeleted = jest.fn();
    const onEditExercise = jest.fn();

    render(
      <ExerciseItem
        exercise={mockExercise}
        onExerciseDeleted={onExerciseDeleted}
        onEditExercise={onEditExercise}
      />,
    );

    expect(screen.getByText("Test Exercise")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("Subpart 1")).toBeInTheDocument();
  });

  it('opens the confirmation dialog when "Usuń" button is clicked', () => {
    const onExerciseDeleted = jest.fn();
    const onEditExercise = jest.fn();

    render(
      <ExerciseItem
        exercise={mockExercise}
        onExerciseDeleted={onExerciseDeleted}
        onEditExercise={onEditExercise}
      />,
    );

    fireEvent.click(screen.getByText("Usuń"));
    expect(screen.getByText("Potwierdzenie usunięcia")).toBeInTheDocument();
  });

  it('closes the confirmation dialog when "Anuluj" button is clicked', async () => {
    const onExerciseDeleted = jest.fn();
    const onEditExercise = jest.fn();

    render(
      <ExerciseItem
        exercise={mockExercise}
        onExerciseDeleted={onExerciseDeleted}
        onEditExercise={onEditExercise}
      />,
    );

    fireEvent.click(screen.getByText("Usuń"));
    expect(screen.getByText("Potwierdzenie usunięcia")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Anuluj"));
    await waitForElementToBeRemoved(() =>
      screen.queryByText("Potwierdzenie usunięcia"),
    );
  });

  it('calls onEditExercise with the correct exercise when "Edytuj" button is clicked', () => {
    const onExerciseDeleted = jest.fn();
    const onEditExercise = jest.fn();

    render(
      <ExerciseItem
        exercise={mockExercise}
        onExerciseDeleted={onExerciseDeleted}
        onEditExercise={onEditExercise}
      />,
    );

    fireEvent.click(screen.getByText("Edytuj"));
    expect(onEditExercise).toHaveBeenCalledWith(mockExercise);
  });
});
