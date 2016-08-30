export default function parseSafe(data, defaultValue) {
    if(data){
        try {
            return JSON.parse(data);
        } catch (err) {
            console.error(err);
            return defaultValue;
        }
    } else {
        return defaultValue;
    }
}