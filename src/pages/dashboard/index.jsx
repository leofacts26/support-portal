import React from 'react'

const Dashboard = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="header">
          <div className="container-fluid">
            {/* Body */}
            <div className="header-body">
              <div className="row align-items-end">
                <div className="col">
                  {/* Pretitle */}
                  <h6 className="header-pretitle">Overview</h6>
                  {/* Title */}
                  <h1 className="header-title">Dashboard</h1>
                </div>
                <div className="col-auto">
                  {/* Button */}
                  <a href="#!" className="btn btn-primary lift">
                    Create Report
                  </a>
                </div>
              </div>{" "}
              {/* / .row */}
            </div>{" "}
            {/* / .header-body */}
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6 col-xl">
            {/* Value  */}
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center gx-0">
                  <div className="col">
                    {/* Title */}
                    <h6 className="text-uppercase text-body-secondary mb-2">Value</h6>
                    {/* Heading */}
                    <span className="h2 mb-0">$24,500</span>
                    {/* Badge */}
                    <span className="badge text-bg-success-subtle mt-n1">+3.5%</span>
                  </div>
                  <div className="col-auto">
                    {/* Icon */}
                    <span className="h2 fe fe-dollar-sign text-body-secondary mb-0" />
                  </div>
                </div>{" "}
                {/* / .row */}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xl">
            {/* Hours */}
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center gx-0">
                  <div className="col">
                    {/* Title */}
                    <h6 className="text-uppercase text-body-secondary mb-2">
                      Total hours
                    </h6>
                    {/* Heading */}
                    <span className="h2 mb-0">763.5</span>
                  </div>
                  <div className="col-auto">
                    {/* Icon */}
                    <span className="h2 fe fe-briefcase text-body-secondary mb-0" />
                  </div>
                </div>{" "}
                {/* / .row */}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xl">
            {/* Exit */}
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center gx-0">
                  <div className="col">
                    {/* Title */}
                    <h6 className="text-uppercase text-body-secondary mb-2">Exit %</h6>
                    {/* Heading */}
                    <span className="h2 mb-0">35.5%</span>
                  </div>
                  <div className="col-auto">
                    {/* Chart */}
                    <div className="chart chart-sparkline">
                      <canvas
                        className="chart-canvas"
                        id="sparklineChart"
                        style={{
                          display: "block",
                          boxSizing: "border-box",
                          height: 35,
                          width: 75
                        }}
                        width={93}
                        height={43}
                      />
                    </div>
                  </div>
                </div>{" "}
                {/* / .row */}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xl">
            {/* Time */}
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center gx-0">
                  <div className="col">
                    {/* Title */}
                    <h6 className="text-uppercase text-body-secondary mb-2">
                      Avg. Time
                    </h6>
                    {/* Heading */}
                    <span className="h2 mb-0">2:37</span>
                  </div>
                  <div className="col-auto">
                    {/* Icon */}
                    <span className="h2 fe fe-clock text-body-secondary mb-0" />
                  </div>
                </div>{" "}
                {/* / .row */}
              </div>
            </div>
          </div>
        </div>

      </div>


    </>
  )
}

export default Dashboard