import React from "react";

function RobotSvg() {
  return (
    <svg viewBox="0 0 150 100">
      <text x="50%" y="50%" textAnchor="middle" alignmentBaseline="middle">&#129302;</text>
      <circle cx="75" cy="45" r="40" stroke="red" strokeWidth="7" fill="none" />
      <line x1="47" y1="17" x2="103" y2="73" stroke="red" strokeWidth="7" />
    </svg>
  )
}

function NoRobotSvg() {
  return (
    <svg viewBox="0 0 150 100">
      <text x="50%" y="50%" textAnchor="middle" alignmentBaseline="middle">&#128077;</text>
    </svg>
  )
}

export {
  RobotSvg,
  NoRobotSvg
}
