import { useRef, useState } from 'react';
import Papa from 'papaparse';
import { Card, CardContent, Container, Typography, Button, TextField } from '@mui/material';

type CsvRow = {
  _1: string;
  _2: string;
  _3: string;
  _4: string;
}

function App() {
  const csv = useRef<File>();
  const [csvData, setCsvData] = useState<CsvRow[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    csv.current = event.target.files?.[0];

    if (csv.current) {
      Papa.parse(csv.current, {
        header: true,
        complete: (results) => {
          setCsvData(results.data.splice(1) as CsvRow[]);
        },
      });
    }
  };

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCsvData = csvData.filter((row) => {
    const values = Object.values(row);
    return values.some((value) => value.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        CSV Search Cards
      </Typography>
      <Button variant="contained" component="label">
        Select a CSV file from the local machine
        <input type="file" hidden accept="text/csv" onChange={handleFileUpload} />
      </Button>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchTermChange}
        sx={{ my: 2 }}
      />
      {filteredCsvData.length > 0 ? (
        filteredCsvData.map((row, index) => (
          <Card key={index} sx={{ my: 2 }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {row._1}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {row._2}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {row._3}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {row._4}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="h6" color="textSecondary" align="center">
          No results found.
        </Typography>
      )}
    </Container>
  );
}

export default App;
