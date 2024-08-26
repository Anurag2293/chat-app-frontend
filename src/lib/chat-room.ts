

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