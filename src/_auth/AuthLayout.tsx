import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <div className="flex h-screen w-full">
      {/* Left side: Form */}
      <section className="flex flex-1 justify-center items-center flex-col py-10">
        <Outlet />
      </section>

      {/* Right side: Image */}
      <img
        src="/assets/images/Social-Media-logo.jpg"
        alt="logo"
        className="hidden xl:block h-full w-1/2 object-cover"
      />
    </div>
  );
};

export default AuthLayout;
