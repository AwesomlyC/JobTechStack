import React from 'react'

function GlobalKeywordTable({globalStatistics}) {
  return (
    <div className='result'>
      {Object.entries(globalStatistics).map(([key, value], index) => {
        const tableIndex = Math.floor(index / 15);
        const rowIndex = index % 15;

        return (
          <div key={index}>
            {rowIndex === 0 && (
              <table className='table-skills'>
                <thead>
                  <tr className='table-headers'>
                    <th>Index</th>
                    <th>Skill</th>
                    <th>Count</th>
                  </tr>
                </thead>

                {[...Array(15)].map((_, i) => {
                  const tableIndexOffset = tableIndex * 15 + i;
                  if (tableIndexOffset < Object.entries(globalStatistics).length) {
                    const [currentKey, currentValue] = Object.entries(globalStatistics)[tableIndexOffset];
                    return (
                      <tbody>
                        <tr key={tableIndexOffset + 1}>
                          <td>{tableIndexOffset + 1}</td>
                          <td>{currentKey}</td>
                          <td>{currentValue}</td>
                        </tr>
                      </tbody>
                    );

                  }
                  return null;
                })}
              </table>
            )}
          </div>
        )
      }
      )}
    </div>
  )
}

export default GlobalKeywordTable