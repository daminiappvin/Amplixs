import PropTypes from "prop-types";
import side from "../../assets/amplix-side.png";

const AuthLayout = ({ children }) => (
  <div className="h-screen w-full flex justify-center items-center">
    <div className="flex lg:basis-1/2 justify-center items-center px-4">{children}</div>
    <div className="hidden rounded-xl lg:flex lg:basis-1/2">
      <img
        src={side}
        alt="Image"
        className="h-screen w-full object-cover p-4"
        style={{ borderRadius: "2rem" }}
      />
    </div>
  </div>
);

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
