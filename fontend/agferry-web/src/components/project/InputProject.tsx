
type Pros = {
  tile: string;
  label1?: string;
  label2?: string;
  label3?: string;
  label4?: string;
};

const InputProject = ({ tile, label1, label2, label3, label4 }: Pros) => {
  return (
    <div>
      <section className="flex flex-col gap-3">
        <h2 className="text-accent font-bold text-xl">{tile}</h2>
        {label1 && (
          <div>
            <label className="block text-sm font-medium mb-1">{label1}</label>
            <input className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
        )}
        {label2 && (
          <div>
            <label className="block text-sm font-medium mb-1">{label2}</label>
            <input className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
        )}
        {label3 && (
          <div>
            <label className="block text-sm font-medium mb-1">{label3}</label>
            <input className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
        )}
        {label4 && (
          <div>
            <label className="block text-sm font-medium mb-1">{label4}</label>
            <input className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
        )}
      </section>
    </div>
  );
};

export default InputProject;
