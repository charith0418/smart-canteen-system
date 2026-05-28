import {useEffect, useState} from "react";

const Reports = () =>{
    const [sales , setSales] = useState([]);

    useEffect(() => {
        const storedSales =
        JSON.parse(localStorage.getItem("sales"))|| []
    ;
setSales(storedSales);
    },[]);

    const totalIncome = sales.reduce (
        (acc, sale)=> acc + sale.total,
        0
    );

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Sales Reports
            </h1>

            <div className="bg-white rounded-2xl shadow p-6 mb-6">
                <h2 className='text-lg text-gray-500'>Total Income
                </h2>

                <p className="text-4xl font-bold text-green-600 mt-2">
                    Rs. {totalIncome}
                </p>
            </div>

             
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-2xl font-semibold mb-4">
          Completed Sales
        </h2>

        {sales.length === 0 ? (
          <p className="text-gray-500">
            No sales available.
          </p>
        ) : (
          <div className="space-y-4">

            {sales.map((sale) => (
              <div
                key={sale.id}
                className="border rounded-xl p-4"
              >

                <div className="flex justify-between mb-3">
                  <p className="font-semibold text-gray-700">
                    Sale ID: {sale.id}
                  </p>

                  <p className="text-sm text-gray-500">
                    {sale.date}
                  </p>
                </div>

                <div className="space-y-2">

                  {sale.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-gray-700"
                    >
                      <p>
                        {item.name} × {item.qty}
                      </p>

                      <p>
                        Rs. {item.price * item.qty}
                      </p>
                    </div>
                  ))}

                </div>

                <div className="border-t mt-4 pt-3 flex justify-between font-bold text-green-600">
                  <p>Total</p>
                  <p>Rs. {sale.total}</p>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Reports;

