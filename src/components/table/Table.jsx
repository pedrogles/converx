export default function Table({ colums, data, indexToShow, baseCode }) {
    return(
        <table className="table-auto w-full max-w-md border-separate border-spacing-2 md:max-w-lg">
            <thead>
                <tr className="bg-black hover:bg-slate-950">
                    {colums.map((title, key) => {
                        return(
                            <th key={key} className="text-base bg-gray-700 text-white p-3">
                                {title}
                            </th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {data.slice(0, indexToShow).map((item) => {
                    const key = item[0];
                    const value = item[1].toFixed(2);
                    return (
                        <tr key={item[0]}>
                            <td className="text-base bg-gray-500 text-white p-2 text-center">{key}</td>
                            <td className="flex gap-2 justify-center text-base bg-gray-500 text-white p-2 text-center">
                                <span>{value}</span>
                                <span>{baseCode}</span>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}