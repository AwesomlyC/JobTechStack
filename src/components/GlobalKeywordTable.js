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
                <thead className='table-description'>
                  <tr className='table-headers'>
                    <th className='header'>Index</th>
                    <th className='header' id ='header-skill'>Skill</th>
                    <th className='header'>Count</th>
                  </tr>
                </thead>

                {[...Array(15)].map((_, i) => {
                  const tableIndexOffset = tableIndex * 15 + i;
                  if (tableIndexOffset < Object.entries(globalStatistics).length) {
                    const [currentKey, currentValue] = Object.entries(globalStatistics)[tableIndexOffset];
                    return (
                      <tbody className='keyword-data'>
                        <tr key={tableIndexOffset + 1}>
                          <td>{tableIndexOffset + 1}</td>
                          <td className='keyword-skill'>{currentKey}</td>
                          <td><b>{currentValue}</b></td>
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