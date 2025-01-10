import React from 'react'

function GlobalKeywordTable({globalStatistics}) {

  const NUM_ROWS = 20;
  return (
    <div className='keyword-result'>
      {Object.entries(globalStatistics).map(([key, value], index) => {
        const tableIndex = Math.floor(index / NUM_ROWS);
        const rowIndex = index % NUM_ROWS;

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

                {[...Array(NUM_ROWS)].map((_, i) => {
                  const tableIndexOffset = tableIndex * NUM_ROWS + i;
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