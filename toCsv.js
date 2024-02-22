const export_btn = document.getElementById('export');
const data = [
  { name: 'Serge', age: 27, city: 'Curitiba' },
  { name: 'Alain', age: 22, city: 'Londrina' },
];

function convertToCsv(data_csv) {
  let csv = '';
  let row = '';
  //format header
  const objectArray =
    typeof data_csv !== 'object' ? JSON.parse(data_csv) : data_csv;
  let csv_header = [];
  for (let dt of objectArray) {
    // typeof dt == "object" ? Object.keys(dt).join(',') : JSON.parse(dt);
    csv_header = Object.keys(dt).join(',');
    row += Object.values(dt) + '\n';
  }
  csv += csv_header;
  csv += '\n';
  csv += row;
  return csv;
}

function exportToCsv() {
  const dataHeader = ['name', 'city', 'age'];
  const header = { dataHeader };

  try {
    const csv = convertToCsv(data);
    const blob = new Blob([csv], { type: "'text/csv;charset=utf-8;';" });

    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (errors) {
    console.log(errors.message);
  }
}

export_btn.addEventListener('click', () => {
  exportToCsv();
  console.log('done');
});
