import { useEffect, useState } from "react";

type numero = {
  valor: number;
  cor?: string;
};

function Home() {
  const geraArrayRandom = () => {
    let numeroArray: numero[] = [];
    let tamanho = 50;
    // numeroArray = [
    //   { valor: 5 },
    //   { valor: 2 },
    //   { valor: 4 },
    //   { valor: 6 },
    //   { valor: 1 },
    //   { valor: 3 },
    // ];
    for (let i = 0; i < tamanho; i++) {
      let tmp: numero = { valor: 0 };
      tmp.valor = Math.floor(Math.random() * 100) + 1;
      numeroArray.push(tmp);
    }
    return numeroArray;
  };

  const [velocidade, setVelocidade] = useState<number>(1);
  const [numeros, setNumeros] = useState<numero[]>(geraArrayRandom);
  const [metodoOrdenacao, setMetodoOrdenacao] = useState<string>("Bubblesort");
  const [disableButtons, setDisableButtons] = useState<boolean>(false);

  useEffect(() => {
    document.title = metodoOrdenacao;
  }, [metodoOrdenacao]);

  const ordenar = async () => {
    setDisableButtons(true);
    if (metodoOrdenacao == "Bubblesort") {
      await bubbleSort();
    } else if (metodoOrdenacao == "Mergesort") {
      await mergesort([...numeros]);
    } else if (metodoOrdenacao == "Selection sort") {
      await selectionSort();
    }
    setDisableButtons(false);
  };

  const bubbleSort = async () => {
    let arrayAux = [...numeros];
    let len = arrayAux.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (arrayAux[j]?.valor > arrayAux[j + 1]?.valor) {
          // Seta vermelho
          arrayAux[j].cor = "#BEAFC2";
          if (arrayAux[j + 1] !== undefined) {
            arrayAux[j + 1].cor = "#BEAFC2";
          }
          setNumeros([...arrayAux]);
          // fim seta vermelho

          await sleep(getVelocidade()); // 1
          let tmp = arrayAux[j];
          arrayAux[j] = arrayAux[j + 1];
          arrayAux[j + 1] = tmp;
        }
        // Seta preto
        arrayAux[j].cor = "#281C2D";
        if (arrayAux[j + 1] !== undefined) {
          arrayAux[j + 1].cor = "#281C2D";
        }
        // fim seta preto

        setNumeros([...arrayAux]);
      }
    }
  };
  const mergesort = async (arr: numero[]) => {
    //Create two arrays for sorting
    let sorted = Array.from(arr);
    let n = sorted.length;
    let buffer = new Array(n);

    for (let size = 1; size < n; size *= 2) {
      setNumeros([...sorted]);
      await sleep(getVelocidade()); //1
      for (let leftStart = 0; leftStart < n; leftStart += 2 * size) {
        //Get the two sub arrays
        let left = leftStart,
          right = Math.min(left + size, n),
          leftLimit = right,
          rightLimit = Math.min(right + size, n);

        //Merge the sub arrays
        await merge(left, right, leftLimit, rightLimit, sorted, buffer);
      }

      //Swap the sorted sub array and merge them
      let temp = sorted;
      sorted = buffer;
      buffer = temp;
    }
    setNumeros([...sorted]);
    return sorted;
  };

  const merge = async (
    left: number,
    right: number,
    leftLimit: number,
    rightLimit: number,
    sorted: numero[],
    buffer: numero[]
  ) => {
    let i = left;

    //Compare the two sub arrays and merge them in the sorted order
    while (left < leftLimit && right < rightLimit) {
      sorted[left].cor = "white";
      sorted[left + 1].cor = "white";
      setNumeros([...sorted]);
      if (sorted[left].valor <= sorted[right].valor) {
        buffer[i++] = sorted[left++];
      } else {
        buffer[i++] = sorted[right++];
      }
      await sleep(getVelocidade() / 2); //50
    }
    for (let j = 0; j < sorted.length; j++) {
      sorted[j].cor = "#281C2D";
    }
    setNumeros(sorted);

    //If there are elements in the left sub arrray then add it to the result
    while (left < leftLimit) {
      buffer[i++] = sorted[left++];
    }

    //If there are elements in the right sub array then add it to the result
    while (right < rightLimit) {
      buffer[i++] = sorted[right++];
    }
  };

  const selectionSort = async () => {
    let arrayAux = [...numeros];
    let n = arrayAux.length;
    let indiceUltimoVermelho = -1;
    for (let i = 0; i < n; i++) {
      // Finding the smallest number in the subarray
      let min = i;
      arrayAux[min].cor = "#BEAFC2";
      setNumeros([...arrayAux]);
      await sleep(getVelocidade());
      for (let j = i + 1; j < n; j++) {
        arrayAux[j].cor = "#BEAFC2";
        setNumeros([...arrayAux]);
        await sleep(getVelocidade());
        if (arrayAux[j].valor < arrayAux[min].valor) {
          if (indiceUltimoVermelho != -1) {
            arrayAux[indiceUltimoVermelho].cor = "#281C2D";
          }
          min = j;
          arrayAux[min].cor = "red";
          setNumeros([...arrayAux]);
          indiceUltimoVermelho = min;
        } else {
          arrayAux[j].cor = "#281C2D";
          setNumeros([...arrayAux]);
        }
      }
      if (min != i) {
        // Swapping the elements
        arrayAux[min].cor = "#281C2D";
        setNumeros([...arrayAux]);
        arrayAux[i].cor = "#281C2D";
        setNumeros([...arrayAux]);
        let tmp = arrayAux[i];
        arrayAux[i] = arrayAux[min];
        arrayAux[min] = tmp;
      } else {
        arrayAux[i].cor = "#281C2D";
        setNumeros([...arrayAux]);
      }
    }
    setNumeros([...arrayAux]);
  };

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function getVelocidade() {
    if (velocidade == 1) {
      return 200;
    } else if (velocidade == 2) {
      return 100;
    }
    return 500;
  }

  return (
    <div className="flex items-center justify-center container mx-auto -mt-16 h-full">
      <div className="grid col-1 items-center justify-center">
        <div className="flex relative text-xl bg-violet p-10 rounded-xl h-96">
          <div className="absolute top-0 text-sm right-0 mr-5 mt-2">
            <button
              disabled={disableButtons}
              onClick={() => {
                setNumeros(geraArrayRandom);
              }}
            >
              <i style={{ fontSize: "24px" }} className="fa fa-refresh mr-3" />
            </button>
            <button
              disabled={disableButtons}
              onClick={() => {
                if (velocidade + 1 == 3) {
                  setVelocidade(1);
                } else {
                  setVelocidade(velocidade + 1);
                }
              }}
              className="h-8 bg-white border rounded shadow-sm outline-none text-center font-semibold appearance-none w-32 mr-3"
            >
              Velocidade x{velocidade}
            </button>
            <select
              disabled={disableButtons}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setMetodoOrdenacao(e.target.value);
              }}
              className="text-gray-500 h-8 bg-white border rounded shadow-sm outline-none text-center font-semibold appearance-none w-32"
            >
              <option>Bubblesort</option>
              <option>Mergesort</option>
              <option>Selection sort</option>
            </select>
          </div>
          {numeros.map((numero, index) => (
            <div
              key={index + 1 * Math.random()}
              className="grid grid-cols-1 content-end"
            >
              <div
                key={index + 1 * Math.random()}
                style={{
                  backgroundColor: numero.cor ? numero.cor : "#281C2D",
                  height: numero.valor * 2.5,
                }}
                className="mb-2 w-5 h-10"
              ></div>
              <div
                key={index}
                style={{
                  color: numero.cor,
                  transition: "color 1s",
                }}
                className="mr-5"
              >
                {numero.valor}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-10">
          <button
            disabled={disableButtons}
            className="bg-violet text-purple-dark font-bold  p-1 rounded"
            onClick={ordenar}
          >
            Ordenar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
