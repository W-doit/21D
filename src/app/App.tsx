import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './AuthProvider'
import { AppLayout } from './AppLayout'
import { I18nProvider } from '../i18n/I18nProvider'
import { LandingPage } from '../pages/Landing'
import { AuthPage } from '../pages/Auth'
import { OnboardingPage } from '../pages/Onboarding'
import { SuggestPage } from '../pages/Suggest'
import { TodayPage } from '../pages/Today'
import { WeekPage } from '../pages/Week'
import { RoutineDetailPage } from '../pages/RoutineDetail'
import { ProfilePage } from '../pages/Profile'
import { LibraryPage } from '../pages/Library'

export function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route element={<AppLayout />}>
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/suggest" element={<SuggestPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/today" element={<TodayPage />} />
              <Route path="/week" element={<WeekPage />} />
              <Route path="/routine/:id" element={<RoutineDetailPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </I18nProvider>
  )
}
