import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { Toaster } from "react-hot-toast"
import Collections from "./pages/Collections"
import Study from "./pages/Study"
import CardItems from "./features/cards/CardItems"
import ProtectedRoute from "./features/authentication/ProtectedRoute"
import Community from "./pages/Community"
import StudyInfo from "./features/study/StudyInfo"
import CommunityCollection from "./features/community/CommunityCollection"
import AppLayout from "./ui/AppLayout"
import Main from "./pages/Main"
import ErrorPage from "./pages/ErrorPage"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
})

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/collections" replace /> },
      { path: "collections", element: <Collections />, index: true },
      {
        path: "collections/:collectionId",
        element: <CardItems />,
      },
      { path: "study", element: <Study /> },
      { path: "study/:collectionId", element: <StudyInfo /> },
      { path: "community", element: <Community /> },
      {
        path: "community/:publicCollectionId",
        element: <CommunityCollection />,
      },
    ],
  },
  {
    path: "/intro",
    element: <Main />,
  },
])

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
      <Toaster
        position="bottom-center"
        gutter={12}
        toastOptions={{
          success: {
            duration: 2000,
          },
          error: {
            duration: 4000,
          },
          style: {
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#297cbc",
            color: "#ffffff",
            fontSize: "1.8rem",
            fontWeight: "500",
          },
        }}
      />
    </QueryClientProvider>
  )
}
