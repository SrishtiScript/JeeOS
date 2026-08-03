function createDefaultTasks() {
    return [
        { name: "Theory", completed: false },
        { name: "Module", completed: false },
        { name: "PYQs", completed: false },
        { name: "Formula Revision", completed: false }
    ];
}

function createChapter(name) {
    return {
        name,
        notes: "",
        tasks: createDefaultTasks()
    };
}

let subjects =[

    {
        name: "Mathematics",
        color: "#ffa639",

        chapters: [
createChapter("Limits, Continuity & Differentiability"),
createChapter("Application of Derivatives"),
createChapter("Indefinite Integration"),
createChapter("Definite Integration"),
createChapter("Differential Equations"),
createChapter("Matrices"),
createChapter("Determinants"),
createChapter("Vector Algebra"),
createChapter("3D Geometry"),
createChapter("Sequence & Series"),
createChapter("Binomial Theorem"),
createChapter("Probability"),
createChapter("Statistics"),
createChapter("Complex Numbers"),
createChapter("Quadratic Equations"),
createChapter("Straight Lines"),
createChapter("Circle"),
createChapter("Parabola"),
createChapter("Ellipse"),
createChapter("Hyperbola"),
createChapter("Permutation & Combination"),
createChapter("Trigonometry"),
createChapter("Inverse Trigonometric Functions"),
createChapter("Sets"),
createChapter("Relations & Functions")

        ]

    },

    {
        name: "Physics",
        color: "#68e8ff",

        chapters: [
createChapter("Current Electricity"),
createChapter("Electrostatics"),
createChapter("Modern Physics"),
createChapter("Ray Optics"),
createChapter("Semiconductor Electronics"),
createChapter("Magnetism & Matter"),
createChapter("Moving Charges & Magnetism"),
createChapter("Electromagnetic Induction"),
createChapter("Alternating Current"),
createChapter("Work, Energy & Power"),
createChapter("Rotational Motion"),
createChapter("Centre of Mass & Collision"),
createChapter("SHM"),
createChapter("Waves"),
createChapter("Thermodynamics"),
createChapter("Kinetic Theory of Gases"),
createChapter("Gravitation"),
createChapter("Units & Dimensions"),
createChapter("Errors & Experimental Physics"),
createChapter("Laws of Motion"),
createChapter("Friction"),
createChapter("Circular Motion"),
createChapter("Fluids"),
createChapter("Mechanical Properties of Solids"),
createChapter("Wave Optics"),
createChapter("NLM Applications"),
createChapter("Oscillations (advanced)"),
createChapter("Elasticity"),
createChapter("Surface Tension"),
createChapter("Viscosity")

        ]

    },
     {
        name: "Physical Chemistry",
        color: "#ff70cf",

        chapters: [
createChapter("Mole Concept"),
createChapter("Chemical Equilibrium"),
createChapter("Ionic Equilibrium"),
createChapter("Thermodynamics"),
createChapter("Electrochemistry"),
createChapter("Chemical Kinetics"),
createChapter("Solutions"),
createChapter("Atomic Structure"),
createChapter("Redox Reactions"),
createChapter("Chemical Bonding (overlaps IOC)"),
createChapter("Gaseous State"),
createChapter("Solid State"),
createChapter("Surface Chemistry"),
createChapter("States of Matter"),
createChapter("Colligative Properties")

        ]
        },

        {
            name: "Organic Chemistry",
            color: "#03ff6c",

            chapters: [ 

createChapter("General Organic Chemistry (GOC)"),
createChapter("Isomerism"),
createChapter("Hydrocarbons"),
createChapter("Haloalkanes & Haloarenes"),
createChapter("Alcohols, Phenols & Ethers"),
createChapter("Aldehydes & Ketones"),
createChapter("Carboxylic Acids"),
createChapter("Amines"),
createChapter("Biomolecules"),
createChapter("Named Reactions"),
createChapter("Practical Organic Chemistry"),
createChapter("Polymers"),
createChapter("Chemistry in Everyday Life")
            ]
        },

        {
            name: "Inorganic Chemistry",
            color: "#fbff03",

            chapters: [
createChapter("Chemical Bonding"),
createChapter("Coordination Compounds"),
createChapter("Periodic Table"),
createChapter("p-Block"),
createChapter("d-Block"),
createChapter("Salt Analysis"),
createChapter("MOT/VBT"),
createChapter("s-Block"),
createChapter("Hydrogen"),
createChapter("Metallurgy"),
createChapter("Qualitative Analysis"),
createChapter("Environmental Chemistry")
            ]
        }

];