

export const GetAvatarFallback = (name: string) => {
    return name.toUpperCase().substring(0, 2);
}

export const ShortenRoomDescription = (description: string) => {
    const MAX_DESCRIPTION_LENGTH = 50;
    if (description.length < MAX_DESCRIPTION_LENGTH) {
        return description;
    }
    return description.substring(0, MAX_DESCRIPTION_LENGTH) + "...";
}

export const GetDateFromDateTime = (createdAt: Date) => {
    let date = new Date(createdAt).getDate();
    let month = new Date(createdAt).getMonth();
    let year = new Date(createdAt).getFullYear();

    return `${date < 10 && '0'}${date}/${month < 10 && '0'}${month}/${year}`
}

export const GetTimeFromDateTime = (createdAt: Date) => {
    let hours = new Date(createdAt).getHours();
    const minutes = new Date(createdAt).getMinutes();
    let isPM = false;
    if (hours > 12) {
        isPM = true;
        hours -= 12;
    }
    return `${hours < 10 && '0'}${hours}:${minutes < 10 && '0'}${minutes} ${isPM ? "pm" : "am"}`
}