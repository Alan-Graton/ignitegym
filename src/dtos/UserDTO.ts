interface UserDTO {
  id: string;
  name: string;
  email: string;
  picture: string;
}

const DEFAULT_VALUE = {
  id: "",
  name: "",
  email: "",
  picture: "",
};

export { UserDTO, DEFAULT_VALUE };
