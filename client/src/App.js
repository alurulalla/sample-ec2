import { Button, Container, Stack } from "@chakra-ui/react";
import "./App.css";
import Product from "./components/Product";
import axios from "axios";
import { useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  const onShowProducts = async () => {
    const { data } = await axios.get("/api/products");
    setProducts(data);
  };

  return (
    <>
      <Container maxW="md" color="black">
        <Button colorScheme="teal" size="lg" m={5} onClick={onShowProducts}>
          Get Products
        </Button>
        <Stack spacing={8} direction="column">
          {products.map((prod) => (
            <Product
              key={prod.id}
              name={prod.name}
              description={prod.description}
              price={prod.price}
            />
          ))}
        </Stack>
      </Container>
    </>
  );
}

export default App;
