import React from 'react'

function GlobalKeywordTable({globalStatistics}) {
  const TOTAL_ROWS = globalStatistics ? Object.keys(globalStatistics).length : 150;
  const NUM_TABLES = 5;
  const ROWS_PER_TABLE = Math.floor(TOTAL_ROWS / NUM_TABLES);


  return (
    <div className='keyword-result'>
      {Object.entries(globalStatistics).map(([key, value], index) => {
        const tableIndex = Math.floor(index / ROWS_PER_TABLE);
        const rowIndex = index % ROWS_PER_TABLE;

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

                {[...Array(ROWS_PER_TABLE)].map((_, i) => {
                  const tableIndexOffset = tableIndex * ROWS_PER_TABLE + i;
                  if (tableIndexOffset < Object.entries(globalStatistics).length) {
                    const [currentKey, currentValue] = Object.entries(globalStatistics)[tableIndexOffset];
                    return (
                      <tbody className='keyword-data' key = {i}>
                        <tr key={tableIndexOffset + 1}>
                          <td className='table-index'>{tableIndexOffset + 1}</td>
                          <td className='keyword-skill'>{currentKey}</td>
                          <td className='table-value'><b>{currentValue}</b></td>
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