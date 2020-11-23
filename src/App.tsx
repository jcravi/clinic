import React, { Fragment, useState } from "react";

import "./App.css";

export const App = () => {
  const [num, setNum] = useState(2);

  const checkTableSize = (i: number) => {
    if (i === num) {
      setNum(num + 1);
    }
  };

  return (
    <div className="overall">
      <div className="info">
        <div>
          <label className="label">
            Name:
            <input type="text" />
          </label>
        </div>
        <div>
          <label className="label">
            Diagnosis:
            <input type="text" />
          </label>
        </div>
        <div>
          <label className="label">
            Procedure done:
            <div contentEditable />
          </label>
        </div>
        <div>
          <label className="label">
            Care:
            <input type="text" />
          </label>
        </div>
        <div>
          <span className="rx">{"\u211E"}</span>
        </div>
      </div>
      <div className="prescription">
        <table>
          <tbody>
            {Array(num)
              .fill("")
              .map((_, i) => {
                const index = i + 1;
                const [maybe, divMaybe] =
                  index === num ? ["maybe", "maybeMiddle"] : ["", "middle"];
                return (
                  <Fragment key={`key-${index}`}>
                    <tr className={maybe}>
                      <td rowSpan={2} style={{ verticalAlign: "top" }}>
                        {index}
                      </td>
                      <td style={{ width: "50px" }}>
                        <input
                          style={{ width: "50px" }}
                          type="text"
                          placeholder="Type"
                          className="tableInput"
                          onChange={() => checkTableSize(index)}
                        />
                      </td>
                      <td>
                        <div style={{ display: "flex" }}>
                          <div style={{ flexGrow: 2, textAlign: "left" }}>
                            <input
                              style={{ width: "100%" }}
                              type="text"
                              placeholder="Name"
                              className="tableInput"
                              onChange={() => checkTableSize(index)}
                            />
                          </div>
                          <div className={divMaybe}>
                            <input
                              style={{ width: "100px" }}
                              type="text"
                              placeholder="Strength"
                              className="tableInput"
                              onChange={() => checkTableSize(index)}
                            />
                          </div>
                          <div>
                            <input
                              style={{ width: "100px" }}
                              type="text"
                              placeholder="Quantity"
                              className="tableInput"
                              onChange={() => checkTableSize(index)}
                            />
                          </div>
                        </div>
                      </td>
                      <td
                        rowSpan={2}
                        style={{
                          width: "100px",
                          verticalAlign: "top",
                          textAlign: "left",
                          outline: "none",
                        }}
                      >
                        <div contentEditable data-ph="Remarks" />
                      </td>
                    </tr>
                    <tr className={maybe}>
                      <td></td>
                      <td>
                        <div className="schedule">
                          <div className="morning">
                            <div>
                              <input
                                style={{ width: "30px" }}
                                type="text"
                                onChange={() => checkTableSize(index)}
                              />
                            </div>
                            Morning
                          </div>
                          <div className={`afternoon ${divMaybe}`}>
                            <div>
                              <input
                                style={{ width: "30px" }}
                                type="text"
                                onChange={() => checkTableSize(index)}
                              />
                            </div>
                            Afternoon
                          </div>
                          <div className="night">
                            <div>
                              <input
                                style={{ width: "30px" }}
                                type="text"
                                onChange={() => checkTableSize(index)}
                              />
                            </div>
                            Night
                          </div>
                        </div>
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
