import create from "zustand";
import { combine } from "zustand/middleware";
import * as jose from "jose";

type UserRole = "unset" | "student" | "teacher";

type TUserForm = { role: UserRole; id: string; name: string };

const userFormInitial: TUserForm = {
  id: "1",
  name: "",
  role: "unset",
};

const useUserForm = create(
  combine(userFormInitial, (set) => ({
    setUserForm: (key: string, val: string) => {
      set({ [key]: val });
    },
  }))
);

const Home = () => {
  const { id, name, role, setUserForm } = useUserForm();

  const sign = async (payload: TUserForm = { id, name, role }) => {
    const alg = "HS256";

    const token = await new jose.SignJWT({ name: "novanda" })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode("supersecret"));

    return token;
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUserForm(e.target.name, e.target.value);
  };

  const onSubmit = async () => {
    const token = await sign();

    alert(token);
  };

  return (
    <main className="h-screen bg-gray-800 text-gray-100 flex justify-center items-center">
      <div className="flex flex-col gap-2 p-6 rounded-2xl bg-primary text-primary-content">
        <input
          type="text"
          name="id"
          placeholder="Your id here"
          className="input w-full max-w-xs"
          onChange={onChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Your name here"
          className="input w-full max-w-xs"
          onChange={onChange}
        />
        <select
          className="select w-full max-w-xs"
          name="role"
          onChange={onChange}
        >
          <option disabled selected>
            Pick your role
          </option>
          <option label="Student">student</option>
          <option label="Teacher">teacher</option>
        </select>

        <button className="btn btn-primary" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </main>
  );
};

export default Home;
