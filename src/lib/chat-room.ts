export const getAvatarFallback = (name: string) => {
    return name.toUpperCase().substring(0, 2);
}

export const shortenRoomDescription = (description: string) => {
    const MAX_DESCRIPTION_LENGTH = 25;
    if (description.length < MAX_DESCRIPTION_LENGTH) {
        return description;
    }
    return description.substring(0, MAX_DESCRIPTION_LENGTH) + "...";
}

export const getDateFromDateTime = (createdAt: Date) => {
    const date = new Date(createdAt).getDate();
    const dateString = date < 10 ? `0${date}` : String(date); 
    const month = new Date(createdAt).getMonth();
    const monthString =  month < 10 ? `0${month}` : String(month);
    const year = new Date(createdAt).getFullYear();

    return `${dateString}/${monthString}/${year}`
}

export const getTimeFromDateTime = (createdAt: Date) => {
    const minutes = new Date(createdAt).getMinutes();
    const minutesString = minutes < 10 ? `0${minutes}` : String(minutes);

    let hours = new Date(createdAt).getHours();
    let isPM = false;
    if (hours > 12) {
        isPM = true;
        hours -= 12;
    }
    const hoursString = hours < 10 ? `0${hours}` : String(hours);

    return `${hoursString}:${minutesString} ${isPM ? "pm" : "am"}`
}