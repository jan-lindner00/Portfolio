export type Skills = {
    name: string,
    imageSrc: string,
    imageAlt: string
}

export type Project = {
    slug: string,
    name: string,
    description: string,
    imgAlt: string,
    functionality: string,
    technologies: string[],
    technologiesPreview: string[],
    whatILearned: string,
    continuedDevelopment: string,
    linkGithub: string,
    linkSite: string,
    imageUrl: string
}

export type ContactRequestBody = {
    name: string,
    email: string,
    subject: string,
    message: string
}

export type MessageType = {
    role: string,
    content: string
}

export type MatchObj = {
    id: number,
    content: string,
    similarity: number
}