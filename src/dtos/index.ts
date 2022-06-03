export interface IUsersDto {
  id: string;
  nome: string;
  email: string;
  avatar: string | null;
  adm: boolean;
  senha?: string;
}

export interface INewsDto {
  id: string;
  title: string;
  descricao: string;
  type: string;
  video: string;
  image: string;
}

export interface ILive {
  descricao: string;
  title: string;
  video: string;
}
