export const ViewConfig = {
    url: 'https://api.github.com/repos/cpelican/commits-history/commits',
};

export async function fetchItems() {
    const response = await fetch(ViewConfig.url, {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: 'Bearer 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',
        },
    });

    const responseData = await response.json();
    if (response.ok && responseData != null) {
        return responseData;
    }

    throw responseData;
}
