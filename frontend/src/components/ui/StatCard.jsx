import Card from "./Card";

const StatCard = ({ title, value }) => {

    return (

        <Card className="text-center">

            <p className="text-gray-500">

                {title}

            </p>

            <h2 className="text-3xl font-bold mt-2">

                {value}

            </h2>

        </Card>

    );

};

export default StatCard;