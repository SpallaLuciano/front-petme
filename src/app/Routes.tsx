import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthWrapper } from './auth';
import {
  Chat,
  Chats,
  EmailValidation,
  Events,
  Health,
  Home,
  MyPets,
  MyProfile,
  PetDetail,
  Profile,
  RecoverPassword,
  RecoverPasswordSend,
  ResetPassword,
  SignedUp,
  SignUp,
  Favorites
} from './pages';
import { SignIn } from './pages/SignIn';

export const AppRoutes: FC = () => (
  <Routes>
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/signed-up" element={<SignedUp />} />
    <Route path="/confirm-email/:token" element={<EmailValidation />} />
    <Route path="/recover-password" element={<RecoverPassword />} />
    <Route path="/recover-password-send" element={<RecoverPasswordSend />} />
    <Route path="/reset-password/:token" element={<ResetPassword />} />
    <Route element={<AuthWrapper />}>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/my-profile" element={<MyProfile />} />
      <Route path="/my-pets" element={<MyPets />} />
      <Route path="/my-favs" element={<Favorites />} />
      <Route path="/pets/:petId" element={<PetDetail />} />
      <Route path="/profiles/:profileId" element={<Profile />} />
      <Route path="/chats" element={<Chats />} />
      <Route path="/chats/:profileId" element={<Chat />} />
      <Route path="/pets/:petId/health/visits" element={<Events />} />
      <Route path="/pets/:petId/health" element={<Health />} />
    </Route>
    <Route path="*" element={<div>Página no encontrada</div>} />
  </Routes>
);
