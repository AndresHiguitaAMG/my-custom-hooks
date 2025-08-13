import { useEffect, useState } from "react";

const locaCache = {

}

export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: null,
    error: null,
  });

  useEffect(() => {
    getFetch();
  }, [url]);
  
  // Ponemos a nuestro en estado de loading de nuevo
  const loadingState = () => {
    setState({
      data: null,
      isLoading: true,
      hasError: false,
      error: null
    })
  }

  const getFetch = async () => {
    // Verificamos si localCache tiene un valor
    if (locaCache[url]) {
      console.log("Usando caché")
      setState({
        data: locaCache[url],
        isLoading: false,
        hasError: false,
        error: null,
      })
      return
    }

    loadingState();
    
    const resp = await fetch(url);
    //sleep
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (!resp.ok) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: {
          code: resp.status,
          message: resp.statusText
        }
      })
      return;
    }
    //Si no hay error trae la data
    const data = await resp.json();
    setState({
      data,
      isLoading: false,
      hasError: false,
      error: null
    });
    // Manejo el caché
    locaCache[url] = data;
  };

  

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
}
