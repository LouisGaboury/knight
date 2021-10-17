const ConnexionForm = (props) => {
  return (
    <form className="mb-24">
      <fieldset>
        <div className="flex flex-col mx-4 mb-4">
          <label>login</label>
          <input type="text" name="login" id="login"></input>
        </div>
        <div className="flex flex-col mx-4 mb-4">
          <label>mot de passe</label>
          <input type="password" name="password" id="password"></input>
        </div>
      </fieldset>
    </form>
  );
};

export default ConnexionForm;
