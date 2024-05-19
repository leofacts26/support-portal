import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  
  const onHandleSubmit = (e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-md-5 col-lg-6 col-xl-4 px-lg-6 my-5 align-self-center">
          {/* Heading */}
          <h1 className="display-4 text-center mb-3">Sign in</h1>
          {/* Subheading */}
          <p className="text-body-secondary text-center mb-5">
            Free access to our dashboard.
          </p>
          {/* Form */}
          <form onSubmit={onHandleSubmit}>
            {/* Email address */}
            <div className="form-group">
              {/* Label */}
              <label className="form-label">Email Address</label>
              {/* Input */}
              <input
                type="email"
                className="form-control"
                placeholder="name@address.com"
                style={{
                  backgroundImage: 'url("data:image/png',
                  backgroundRepeat: "no-repeat",
                  backgroundAttachment: "scroll",
                  backgroundSize: "16px 18px",
                  backgroundPosition: "98% 50%",
                  cursor: "auto"
                }}
              />
            </div>
            {/* Password */}
            <div className="form-group">
              <div className="row">
                <div className="col">
                  {/* Label */}
                  <label className="form-label">Password</label>
                </div>
                <div className="col-auto">
                  {/* Help text */}
                  <a
                    href="password-reset-cover.html"
                    className="form-text small text-body-secondary"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>{" "}
              {/* / .row */}
              {/* Input group */}
              <div className="input-group input-group-merge">
                {/* Input */}
                <input
                  className="form-control"
                  type="password"
                  placeholder="Enter your password"
                  style={{
                    backgroundImage: 'url("data:image/png',
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "scroll",
                    backgroundSize: "16px 18px",
                    backgroundPosition: "98% 50%"
                  }}
                />
                {/* Icon */}
                <span className="input-group-text">
                  <i className="fe fe-eye" />
                </span>
              </div>
            </div>
            {/* Submit */}
            <button className="btn btn-lg w-100 btn-primary mb-3">Sign in</button>
          </form>
        </div>
        <div className="col-12 col-md-7 col-lg-6 col-xl-8 d-none d-lg-block">
          {/* Image */}
          <div
            className="bg-cover h-100 min-vh-100 mt-n1 me-n3"
            style={{
              backgroundImage: "url(https://dashkit.goodthemes.co/assets/img/covers/auth-side-cover.jpg)"
            }}
          />
        </div>
      </div>{" "}
      {/* / .row */}
    </div>

  )
}

export default Login