import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import FavoritesPage from '../components/FavoritesPage';
import WorkoutProgramDetailsPage from '../components/WorkoutsPrograms';
import CreateWorkoutProgram from '../components/WorkoutsPrograms/CreateWorkoutProgram';
import EditWorkoutProgram from '../components/WorkoutsPrograms/EditWorkoutProgram';
import Layout from './Layout';
import HomePage from '../components/HomePage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
      {
        path: "workout_programs/:workoutProgramId",
        element: <WorkoutProgramDetailsPage />,
      },
      {
        path: "workout_programs/new",
        element: <CreateWorkoutProgram />,
      },
      {
        path: "workout_programs/:workoutProgramId/edit",
        element: <EditWorkoutProgram />
      },
    ],
  },
]);
