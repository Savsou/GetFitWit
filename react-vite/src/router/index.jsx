import { createBrowserRouter } from 'react-router-dom';
import FavoritesPage from '../components/FavoritesPage';
import WorkoutProgramDetailsPage from '../components/WorkoutsPrograms';
import CreateWorkoutProgram from '../components/WorkoutsPrograms/CreateWorkoutProgram';
import EditWorkoutProgram from '../components/WorkoutsPrograms/EditWorkoutProgram';
import LoginFormPage from '../components/LoginFormPage'
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import UserProfilePage from '../components/UserProfilePage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
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
      {
        path: "profile/:userId",
        element: <UserProfilePage />
      }
    ],
  },
]);
