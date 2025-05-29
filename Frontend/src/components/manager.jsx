import { v4 as uuidv4 } from "uuid";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const manager = () => {
  const eyebtn = useRef("");
  const [eye, setEye] = useState(true);
  const [form, setform] = useState({ url: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/auth");
    const result = await req.json();
    setpasswordArray(result.data);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const showPassword = (e) => {
    if (eye) {
      J;
      eyebtn.current.className = "fa-solid fa-eye-slash cursor-pointer";
      e.target.parentElement.firstChild.type = "password";
      setEye(false);
    } else {
      eyebtn.current.className = "fa-solid fa-eye cursor-pointer";
      e.target.parentElement.firstChild.type = "text";
      setEye(true);
    }
  };

  const savePassword = async () => {
    setpasswordArray([...passwordArray]);
    const res = await fetch("http://localhost:3000/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form }),
    });
    const result = await res.json();
    if (result.success) {
      toast.success("Sucessfully Saved!");
      setform({ url: "", username: "", password: "" });
    }

    getPasswords();
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast(`Copied to clipboard "${text}"`);
    navigator.clipboard.writeText(text);
  };

  const onEdit = (id) => {
    let editedItem = passwordArray.filter((item) => item._id == id);
    setform(editedItem[0]);
    setpasswordArray(passwordArray.filter((item) => item._id !== id));
    onDelete(id);
  };

  const onDelete = async (id) => {
    setpasswordArray(passwordArray.filter((item) => item._id !== id));
    const res = await fetch("http://localhost:3000/auth", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const result = await res.json();
    if (result.success) {
      toast.success("Deleted Sucessfully!");
      getPasswords();
    } else {
      toast.error("server error");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-green-50 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      <div className="m-auto mt-7 w-[60%]">
        <div className="text-center">
          <p className="font-bold text-2xl">
            <span>&lt;</span>
            <span>Priva</span>
            <span className="text-green-600">Coder</span>
            <span>/&gt;</span>
          </p>
          <span className="text-green-800">Your own Password Manager</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 mt-5 w-full">
          <input
            name="url"
            value={form.url}
            onChange={handleChange}
            placeholder="url/sitename"
            type="text"
            className="w-full border-green-700 border-2 outline-none p-1 rounded-lg"
          />
          <div className="w-full flex justify-between items-center">
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="userName"
              type="text"
              className="w-full border-green-700 border-2 outline-none mr-1 p-1 rounded-lg"
            />
            <div className=" flex justify-between items-center w-full border-green-700 border-2 outline-none p-1 rounded-lg bg-white">
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="password"
                type="password"
                className="w-full outline-none"
              />
              <i
                onClick={(e) => {
                  showPassword(e);
                }}
                ref={eyebtn}
                className="fa-solid fa-eye-slash cursor-pointer"
              ></i>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="px-6 py-2 bg-green-700 text-center rounded-lg text-white font-bold hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </div>
      <div className="text-center w-[60%] m-auto">
        <h2 className="font-bold mt-7 mb-5">Your Passwords</h2>
        {passwordArray.length <= 0 ? (
          <div className="text-start text-lg text-blue-700">
            You have no passwords
          </div>
        ) : (
          <table className="border border-slate-600 border-collapse w-full">
            <thead>
              <tr className="h-10 bg-green-700 text-white">
                <th className="border border-slate-600 ">Url/Sitename</th>
                <th className="border border-slate-600 ">Username</th>
                <th className="border border-slate-600 ">Password</th>
                <th className="border border-slate-600 ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {passwordArray.map((item, index) => {
                return (
                  <tr key={index} className="h-10">
                    <td className="border border-slate-600 px-3">
                      <span className="flex justify-center items-center gap-2">
                        {item.url}
                        <i
                          className="fa-regular fa-copy cursor-pointer"
                          onClick={() => {
                            copyText(item.url);
                          }}
                        ></i>
                      </span>
                    </td>
                    <td className="border border-slate-600 px-3">
                      <span className="flex justify-center items-center gap-2">
                        {item.username}
                        <i
                          className="fa-regular fa-copy cursor-pointer"
                          onClick={() => {
                            copyText(item.username);
                          }}
                        ></i>
                      </span>
                    </td>
                    <td className="border border-slate-600 px-3">
                      <span className="flex justify-center items-center gap-2">
                        {item.password}
                        <i
                          className="fa-regular fa-copy cursor-pointer"
                          onClick={() => {
                            copyText(item.password);
                          }}
                        ></i>
                      </span>
                    </td>

                    <td className="border border-slate-600 ">
                      <div className="flex justify-evenly">
                        <span>
                          <i
                            className="fa-solid fa-pen cursor-pointer text-blue-900 hover:text-green-800"
                            onClick={() => {
                              onEdit(item._id);
                            }}
                          ></i>
                        </span>
                        <span>
                          <i
                            className="fa-solid fa-trash cursor-pointer text-red-700  hover:text-red-900"
                            onClick={() => {
                              onDelete(item._id);
                            }}
                          ></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default manager;
