import React from 'react'

const Learn = () => {
  return (
    <div className=" mb-6 flex flex-col gap-4 max-w-5xl w-full mt-6">
            <div className="flex flex-row gap-3">
              <div className="flex">
                <img src="/test2.png" alt="" />
              </div>
              <div className="flex flex-col">
                <div>
                  <h3 className="font-bold mb-1 text-2xl">What you’ll learn</h3>
                  <ul className="text-[#666666] text-sm w-[80%]">
                    The skills that you would learn after taking up this DBMS
                    Course - Master the Fundamentals and Advanced
                    Concepts online course are:
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex ">
              <ul className="list-disc text-[#666666] text-sm ml-5 gap-2">
                <li>Understanding of database management systems</li>
                <li>Knowledge of different types of database models</li>
                <li>Understanding of SQL programming language</li>
                <li>Ability to design and implement a database schema</li>
                <li>
                  Knowledge of normalization and denormalization techniques
                </li>
                <li>Understanding of query optimization</li>
              </ul>
            </div>
          </div>
  )
}

export default Learn