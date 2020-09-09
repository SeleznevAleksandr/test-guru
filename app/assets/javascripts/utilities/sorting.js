document.addEventListener('turbolinks:load', function() {
  var control = document.querySelector('.sort-by-title')

  if (control) { control.addEventListener('click', sortRowsByTitle) }
})

function sortRowsByTitle() {
  var table = document.querySelector('table')
  
  var rows = table.querySelectorAll('tr')
  var sortedRows = []
  
  for (var i = 1; i < rows.length; i++) {
	  sortedRows.push(rows[i])
  } 
  
  if (this.querySelector('.octicon-arrow-up').classList.contains('d-none')) {
	sortedRows.sort(compareRowsAsc)
	this.querySelector('.octicon-arrow-up').classList.remove('d-none')
	this.querySelector('.octicon-arrow-down').classList.add('d-none')
  } else {
	sortedRows.sort(compareRowsDesc)
	this.querySelector('.octicon-arrow-up').classList.add('d-none')
	this.querySelector('.octicon-arrow-down').classList.remove('d-none')
  }
  var sortedTable = document.createElement('table')
  sortedTable.className = "table table-stripped table-sm"

  // sortedTable.classList.add('table', 'table-stripped', 'table-sm')
  
  // var table_head = rows[0]
  // table_head.className = 'thead-dark text-center'
  sortedTable.appendChild(rows[0]).className = 'thead-dark text-center'
  
  for (var i = 0; i < sortedRows.length; i++) {
    sortedTable.appendChild(sortedRows[i])
  }
  
  table.parentNode.replaceChild(sortedTable, table)
}

function compareRowsAsc(row1, row2) {
  var testTitle1 = row1.querySelector('td').textContent.toLowerCase()
  var testTitle2 = row2.querySelector('td').textContent.toLowerCase()

  if(testTitle1 < testTitle2) { return -1 }
  if(testTitle1 > testTitle2) { return 1 }
  return 0
}

function compareRowsDesc(row1, row2) {
  var testTitle1 = row1.querySelector('td').textContent.toLowerCase()
  var testTitle2 = row2.querySelector('td').textContent.toLowerCase()

  if(testTitle1 < testTitle2) { return 1 }
  if(testTitle1 > testTitle2) { return -1 }
  return 0
}
