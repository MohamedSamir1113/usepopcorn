import { useEffect ,useState} from "react";
export function useLocalStorageState(initialState,key) {
    const [value, setValue] = useState(function () {
        const storedValue = JSON.parse(localStorage.getItem(key));
        return storedValue?storedValue:initialState; //this will only work on initial render
      });
    useEffect(
        function () {
          localStorage.setItem(key, JSON.stringify(value));
        },
        [value,key]
      );

      return[value,setValue]
}