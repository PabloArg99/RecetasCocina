import axios from "axios";

const url = 'https://66663bb1a2f8516ff7a2e4b0.mockapi.io/recetas'


export const getAll = async () => {
    try {
        const { data: recetas } = await axios.get(url)
        return recetas
    }
    catch(error) {
        console.error("Error productos GET:", error);
        return []
    }
}