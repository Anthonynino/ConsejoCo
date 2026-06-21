import { useState, useEffect } from "react";
import { FaHandsHelping, FaEye, FaEyeSlash } from "react-icons/fa";
import CustomInput from "../../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const { login, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !authLoading) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success("¡Bienvenido al sistema!");
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.response?.data?.message ?? "Error al iniciar sesión. Intenta de nuevo.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card principal */}
        <div className="card bg-base-100 shadow-2xl border border-base-200">
          <div className="card-body p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <FaHandsHelping className="text-2xl text-primary-content" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-base-content mb-2">
                Consejo Comunal
              </h1>
              <p className="text-sm text-base-content/60">
                Sistema Administrativo
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <CustomInput
                label="Correo electrónico"
                type="email"
                name="email"
                placeholder="usuario@ejemplo.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">
                    Contraseña
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    className="input input-bordered input-sm w-full focus:input-primary bg-base-200/20 pr-12"
                    value={formData.password}
                    onChange={handleInputChange}
                    name="password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-primary transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
              </div>

              {/* Botón */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary mt-4 w-full capitalize font-bold shadow-lg shadow-primary/20"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  "Iniciar Sesión"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
