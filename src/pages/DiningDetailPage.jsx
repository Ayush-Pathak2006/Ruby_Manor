
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

const DiningDetailPage = () => {
  const { id } = useParams();
  const { session, profile } = useOutletContext();
  const navigate = useNavigate(); 
  
  const [diningOption, setDiningOption] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [reservationDate, setReservationDate] = useState('');
  const [totalCost, setTotalCost] = useState(399); 

  useEffect(() => {
    if (profile) setFullName(profile.full_name || '');
    if (session) setEmail(session.user.email || '');
  }, [session, profile]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: diningData, error: diningError } = await supabase
          .from('dining')
          .select('*').eq('id', id).single();
        if (diningError) throw diningError;
        setDiningOption(diningData);

        const { data: menuData, error: menuError } = await supabase
          .from('menu_items').select('*').eq('dining_id', id);
        if (menuError) throw menuError;
        setMenuItems(menuData);
      } catch (error) {
        console.error("Error fetching dining details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const guests = parseInt(numberOfPeople, 10);
    if (guests > 0) {
      setTotalCost(guests * 399);
    } else {
      setTotalCost(0);
    }
  }, [numberOfPeople]);

  const groupedMenu = menuItems.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {});

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    if (!session) {
      alert("Please log in to make a reservation.");
      navigate('/login');
      return;
    }
    if (totalCost <= 0 || !reservationDate) {
       alert("Please select the number of people and a valid date.");
       return;
    }

    navigate('/payment', {
      state: {
        bookingType: 'dining', 
        diningOption, 
        fullName,
        email,
        reservationDate,
        numberOfPeople,
        totalCost,
      }
    });
  };

   if (loading) {
    return <div className="h-screen flex items-center justify-center bg-gray-900 text-white">Loading menu...</div>;
  }

  if (!diningOption) {
    return <div className="h-screen flex items-center justify-center bg-gray-900 text-white">Restaurant not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white ">
       <div className="h-[50vh] relative mb-12">
        <img src={diningOption.image_url} alt={diningOption.name} className="absolute inset-0 w-full h-full object-cover opacity-40"/>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        <div className="relative z-10 h-full flex flex-col justify-end container mx-auto px-6 pb-12">
          <h1 className="text-6xl font-extrabold">{diningOption.name}</h1>
          <p className="text-xl text-gray-300 mt-2">{diningOption.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-16 flex flex-col md:flex-row gap-12">
        <div className="md:w-2/3">
          <h2 className="text-4xl font-bold mb-8 border-b-2 border-red-500 pb-2 inline-block">Menu</h2>
             {Object.keys(groupedMenu).length === 0 ? (
                <p className="text-gray-400">Menu currently unavailable.</p>
                ) : (
                Object.entries(groupedMenu).map(([category, items]) => (
                    <div key={category} className="mb-10">
                    <h3 className="text-3xl font-semibold text-red-400 mb-4">{category}</h3>
                    <div className="space-y-4">
                        {items.map(item => (
                        <div key={item.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-start">
                            <div>
                            <h4 className="text-xl font-bold">{item.name}</h4>
                            {item.description && <p className="text-gray-400 text-sm mt-1">{item.description}</p>}
                            </div>
                            <p className="text-xl font-semibold text-red-400 ml-4">${item.price}</p>
                        </div>
                        ))}
                    </div>
                    </div>
                ))
            )}
        </div>
        <div className="md:w-1/3">
      <div className="sticky top-32 bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-red-500 pb-2">Make a Reservation</h2>
        <form onSubmit={handleReservationSubmit}>
          <div className="mb-4">
            <label htmlFor="resName" className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text" id="resName" value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" 
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="resEmail" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email" id="resEmail" value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" 
              required
            />
          </div>
              <div className="flex gap-4 mb-4">
                 <div className="w-1/2">
                    <label htmlFor="people" className="block text-sm font-medium mb-1">Number of People</label>
                    <input
                      type="number" id="people" value={numberOfPeople} min="1"
                      onChange={(e) => setNumberOfPeople(e.target.value)}
                      className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                 </div>
                 <div className="w-1/2">
                    <label htmlFor="resDate" className="block text-sm font-medium mb-1">Date</label>
                    <input
                      type="date" id="resDate" value={reservationDate}
                      onChange={(e) => setReservationDate(e.target.value)}
                      className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                 </div>
              </div>

              {totalCost > 0 && (
                <div className="my-6 text-center">
                  <p className="text-lg text-gray-300">Total Reservation Cost:</p>
                  <p className="text-4xl font-bold text-red-400">₹{totalCost}</p>
                  <p className="text-sm text-gray-400">(₹399 per person)</p>
                </div>
              )}

              <button type="submit" disabled={!session} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed">
                Proceed to Payment
              </button>
               {!session && <p className="text-center text-red-400 mt-2 text-sm">Please log in to reserve.</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiningDetailPage;