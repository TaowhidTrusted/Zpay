const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, full_name }),
  });
  
  const data = await response.json();
  console.log(data); // This will show you "User registered successfully!"
};
