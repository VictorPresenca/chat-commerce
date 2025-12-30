type Props = {
  password: string;
};

export function PasswordRules({ password }: Props) {
  const rules = {
    minLength: password.length >= 6,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[^A-Za-z0-9]/.test(password),
  };

  const Item = ({ ok, label }: { ok: boolean; label: string }) => (
    <li className={ok ? "text-green-600" : "text-red-600"}>
      {ok ? "✔" : "✖"} {label}
    </li>
  );

  return (
    <ul className="mt-2 space-y-1 text-sm">
      <Item ok={rules.minLength} label="Mínimo de 6 caracteres" />
      <Item ok={rules.hasUpperCase} label="Letra maiúscula" />
      <Item ok={rules.hasLowerCase} label="Letra minúscula" />
      <Item ok={rules.hasNumber} label="Número" />
      <Item ok={rules.hasSpecialChar} label="Caractere especial" />
    </ul>
  );
}
