import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaThumbsUp } from "react-icons/fa";
import Swal from "sweetalert2";

const Faqs = () => {
  const axiosSecure = useAxiosSecure();

  const { data: faqs = [], refetch } = useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      const res = await axiosSecure.get('/faqs');
      return res.data;
    }
  });

  const handleHelpful = async (id) => {
    try {
      const res = await axiosSecure.patch(`/faqs/${id}/helpful`);
      if (res.data?.message) {
        Swal.fire("Thanks!", "Your vote has been counted.", "success");
        refetch();
      }
    } catch (error) {
      console.error("Voting error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">🧐 FAQs & Forum</h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={faq._id}
            className="collapse collapse-arrow bg-base-200 shadow-md"
          >
            <input type="checkbox" />
            <div className="collapse-title font-medium">
              {index + 1}. {faq.question}
            </div>
            <div className="collapse-content space-y-2">
              <p>{faq.answer}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <button
                  onClick={() => handleHelpful(faq._id)}
                  className="btn btn-sm btn-outline btn-success"
                >
                  <FaThumbsUp className="mr-1" /> Helpful ({faq.helpfulCount})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
