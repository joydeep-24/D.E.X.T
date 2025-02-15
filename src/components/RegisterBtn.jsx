import React from "react";

const RegisterBtn = ({ contract }) => {
  const register = async (event) => {
    event.preventDefault();

    try {
      const finish = await contract.registerProsumer();
      await finish.wait();
      console.log("User Registered");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-outline-success"
      onClick={register}
    >
      Register
    </button>
  );
};

export default RegisterBtn;
