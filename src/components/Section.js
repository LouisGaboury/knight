import { confirmActivity } from "../services/supabase/supabase";
import CoteriesSlider from "./coterie/CoteriesSlider";
import ActionButton from "./utility/ActionButton";

const Section = ({ section, mt }) => {
  const handleConfirmActivity = async () => {
    const result = await confirmActivity(section.id);
    if (result) alert("Votre demande a bien été envoyée");
  };

  return (
    <div className={`w-4/5 shadow-md bg-gray-100 mx-auto ${mt && `mt-${mt}`}`}>
      <div className="p-4">
        <h3 className="text-6xl pt-4 mb-8 text-center">{section?.name}</h3>
        <p>
          Ici on affichera les diverses infos relatives à la section : RG,
          objets possédés, etc. Ca sera fixe
        </p>
        <ActionButton
          textButton="Passer le jour"
          onClick={handleConfirmActivity}
          mt="4"
        />
      </div>
      <hr className="border-2 border-solid" />
      <CoteriesSlider sectionID={section?.id} />
    </div>
  );
};

export default Section;
