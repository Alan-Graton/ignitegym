interface UserDTO {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

const DEFAULT_VALUE = {
  id: "",
  name: "",
  email: "",
  avatar: "",
};

export { UserDTO, DEFAULT_VALUE };
