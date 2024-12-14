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
              <table>
                <thead>
                  <tr className='table-headers'>
                    <th>Index</th>
                    <th>Skill</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>

                  {[...Array(15)].map((_,  i) => {
                    const tableIndexOffset = tableIndex * 15 + i;
                    if  (tableIndexOffset < Object.entries(globalStatistics).length) {
                      const [currentKey, currentValue] = Object.entries(globalStatistics)[tableIndexOffset];
                      return (
                        <tr key ={tableIndexOffset + 1}>
                          <td>{tableIndexOffset + 1}</td>
                          <td>{currentKey}</td>
                          <td>{currentValue}</td>
                        </tr>
                      );
                    
                    }
                    return null;
                  })}
                </tbody>
              </table>
            )}
          </div>
        )
      }
      )}</div>
  )
}

export default GlobalKeywordTable