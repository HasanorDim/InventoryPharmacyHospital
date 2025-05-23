import supabase from "../config/supabase.js";
// import { setTokenOnCookie } from "../lib/util.js";

export const checkAuth = async (req, res) => {
  try {
    const user = req.user;
    const { data: userData, error: err } = await supabase
      .from("userstb")
      .select(
        `*,
        roletb(name)`
      )
      .eq("id", user.id)
      .single();
    return res.status(200).json(userData);
  } catch (error) {
    console.log("Error in checkAuth", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required!" });

  try {
    // Check if username already exists
    const { data: checkUser, error: er } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (er) throw er;

    if (checkUser) {
      // setTokenOnCookie(checkUser.session.access_token, res);

      const { data: user, error: err } = await supabase
        .from("userstb")
        .select(
          `
            *,
            roletb(
              name
            )
          `
        )
        .eq("id", checkUser.user.id)
        .single();

      if (err) throw err;

      // setInterval(() => {
      // supabase.auth.getSession().then(({ data: { session } }) => {
      //   console.log("Seesion11: ", session);
      // });

      // supabase.auth.onAuthStateChange((_, session) => {
      //   console.log("SessionZ: ", session);
      // });
      // }, 5000);

      return res.status(200).json(user);
    }
  } catch (error) {
    console.log("Error in backend login", error);
    return res.status(400).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  let { error } = await supabase.auth.signOut();

  if (error) console.log("error in logout: ", error);
  // Clear the JWT token from the cookie
  // res.clearCookie("jwt");
  // res.clearCookie("jwt_ticket_user");
  // Send response to indicate successful logout
  res.status(200).json({ message: "Logged out successfully" });
};
